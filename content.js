const compose = (...fns) => fns.reduceRight((f, g) => (...args) => f(g(...args)))
const logExt = /\.log{1,3}$/i



let logLinks =  [... document.getElementsByTagName('a')].reduce(
    (prev, val) => val.href.match(logExt) ? prev.concat(val.href) : prev
,[])

console.log(logLinks)

chrome.runtime.sendMessage({links:logLinks}, res => console.log(res))
