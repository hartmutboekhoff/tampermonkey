cls

start "TapmerMonkey Server" node dev/bin/www
#start firefox -P Funke -url http://localhost:3000/ -url moz-extension://a7f72f90-8547-4f95-9f88-9c4e5558f7f3/options.html#nav=dashboard 
start firefox -P Developer -url http://localhost:3000/ -url moz-extension://afa8a369-b845-458b-a5b2-b642656bff1a/options.html#nav=dashboard -url https://github.com/hartmutboekhoff/tampermonkey



