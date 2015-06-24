(ns auth.core
  (:require [cljs.nodejs :as node]))

(enable-console-print!)

(defn dummy [req res next]
  (set! (.-username req) "therealest")
  (next))

(defn noop [] nil)
(set! *main-cli-fn* noop)
