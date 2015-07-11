(ns auth.core
  (:require [cljs.nodejs :as node]))
(enable-console-print!)

(def models (node/require "../../db/models"))
(def User (.-User models))

(def config
  (if (= (.. node/process -env -NODE_ENV) "production")
    #js {:key (.. node/process -env -JWT_KEY)
         :expiresInMinutes (.. node/process -env -JWT_EXPIRES_IN_MINUTES)
         :issuer (.. node/process -env -JWT_ISSUER)}
    (node/require "../jwtConfig")))

(def Q (node/require "q"))
(aset Q "longStackSupport" true)
(def credential (node/require "credential"))
(def cred #js {:hash (.nbind Q (.-hash credential) credential)
               :verify (.nbind Q (.-verify credential) credential)})
(def jsonwebtoken (node/require "jsonwebtoken"))
(def jwt #js {:sign (.-sign jsonwebtoken)
              :verify (.nbind Q (.-verify jsonwebtoken) jsonwebtoken)})

(defn decodeToken [req res next]
  (let [token (aget req "session" "token")]
    (if (nil? token)
      (next)
      (->
        (.verify jwt token (.-key config) #js {:issuer (.-issuer config)})
        (.then (fn [decoded]
                 (aset req "username" (.-username decoded))))
        (.then (fn [] (next)))
        (.catch next)))))

(defn login [req res next]
  (let [username (.. req -body -username)
        password (.. req -body -password)]
    (->
      (.where User #js {:username username})
      (.then (fn [user]
               (when (= (count user) 0)
                 (throw (js/Error. "Invalid username")))
               (.verify cred (.-hashed_pw (first user)) password)))
      (.then (fn [verified]
               (when (not verified)
                 (throw (js/Error. "Invalid password")))
               (.sign jwt #js {:username username}
                      (.-key config)
                      #js {:expiresInMinutes (.-expiresInMinutes config)
                           :issuer (.-issuer config)})))
      (.then (fn [token]
               (aset req "session" "token" token)
               (.send res true)))
      (.catch next))))

(defn register [req res next]
  (let [username (.. req -body -username)
        password (.. req -body -password)]
    (->
      (.where User #js {:username username})
      (.then (fn [user]
               (when (> (count user) 0)
                 (throw (js/Error. "User already exists")))
               (.hash cred password)))
      (.then (fn [hashed-pw]
               (.save User #js {:username username
                                :hashed_pw hashed-pw})))
      (.then (fn [user]
               (login req res next)))
      (.catch next))))

(defn logout [req res next]
  (aset req "session" "token" nil)
  (.send res true))

(defn authorize [req res next]
  (let [username (.-username req)]
    (if (nil? username)
      (->
        (.status res 401)
        (.send false))
      (.send res username))))


(defn noop [] nil)
(set! *main-cli-fn* noop)
