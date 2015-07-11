(defproject count-me-in "0.0.1"
  :description "FIXME: write this!"
  :url "https://github.com/black-magic-mks/count-me-in"

  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-3196"]]

  :node-dependencies [[source-map-support "0.2.8"]]

  :plugins [[lein-cljsbuild "1.0.4"]
            [lein-npm "0.4.0"]]

  :min-lein-version "2.0.0"

  :source-paths ["server/cljs"]

  :clean-targets ["server/auth/cljs","server/auth/auth.js"]

  :cljsbuild {
    :builds [{:id "auth"
              :source-paths ["server/cljs/auth"]
              :compiler {
                :main auth.core
                :output-to "server/auth/auth.js"
                :output-dir "server/auth/cljs"
                :optimizations :none
                :target :nodejs
                :cache-analysis true
                :source-map true}}
             ]})
