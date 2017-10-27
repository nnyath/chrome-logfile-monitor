const fetchFile = async (href) => {

    let decoder = new TextDecoder()
    let encoder = new TextEncoder()
    let reader = (await fetch(href)).body.getReader()
    let regxp = /\n(?=\[)/gm
    let regxperr = '] ERROR'
    
    return await parseStream(reader,decoder,regxp,regxperr)

}

const parseStream = async (reader,decoder,regXp,regXpErr,prevChunk='',matches=[]) => {

  let chunk = await reader.read()
  let decoded = prevChunk + decoder.decode(chunk.value)

  let rows = decoded.split(regXp)
  let match = [...rows].slice(0,-1).reduce((r,v,k)=>{
    return v.indexOf(regXpErr)!==-1 ? r.concat([v]) : r
  },matches)

  if(!chunk.done)
    return await parseStream(reader,decoder,regXp,regXpErr,[...rows.slice(-1)][0],match)
  
  return match

}

chrome.runtime.onMessage.addListener(
     async (request, sender, sendResponse) =>  {
        console.log(await fetchFile(request.links[0]))
    }
)



