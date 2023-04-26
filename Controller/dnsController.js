
const {dnsModel} = require('../Model/dnsModel')
const getDnsDetails = async (req, res) => {
     try{
let url = req.query.url
if(url)
{
    const result = await dnsModel.findOne({url : url})
    try{
    if(result == null){
        console.log("second check")
    const { Resolver } = require('node:dns').promises
const resolver = new Resolver();
 const test = async () => {
//empty data
const sendData = new dnsModel({
    url : url,
    ARecord: [],
    AAAARecord: [],
    MxRecord : [],
    NsRecord : [],
    SOA : []
  })
  await sendData.save()
 const sliceUrl = url.slice(12)

//ARecord
 const aRecord = await resolver.resolve4(sliceUrl)
 for(let i=0; i<aRecord.length; i++){
    const update = await dnsModel.findOneAndUpdate({url :url}, 
    {
       $push : {
        ARecord : aRecord[i]
       }
    })  
}  

//AAAARecord
const aaaaRecord =  await resolver.resolve6(sliceUrl);
for(let i=0; i<aaaaRecord.length; i++){
    const update = await dnsModel.findOneAndUpdate({url :url}, 
    {
       $push : {
        AAAARecord : aaaaRecord[i]
       }
    })  
} 

//mxAddress
  const mxRecord = await resolver.resolveMx(sliceUrl);
  for(let i=0; i<mxRecord.length; i++){
    const update = await dnsModel.findOneAndUpdate({url :url}, 
    {
       $push : {
        MxRecord : {
            exchange : mxRecord[i].exchange,
            priority : mxRecord[i].priority
        }
       }
    })        
  }
  
  //NsRecord
  const nsRecord = await resolver.resolveNs(sliceUrl);
  for(let i=0; i<nsRecord.length; i++){
    const update = await dnsModel.findOneAndUpdate({url :url}, 
    {
       $push : {
        NsRecord : nsRecord[i]
       }
    })        
  }
  //soa
const soa = await resolver.resolveSoa(sliceUrl);
const update = await dnsModel.findOneAndUpdate({url :url}, 
    {
       $push : {
        SOA : [{
            nsname : soa.nsname,
            hostmaster : soa.hostmaster,
            serial: soa.serial,
            refresh : soa.refresh,
            retry : soa.retry,
            expire : soa.expire,
            minttl : soa.minttl
        }]
       }
    }) 
}
const data = await test()
// await Promise.all(data)
console.log(req.query.url)
const getResult = await dnsModel.findOne({url : req.query.url})
return res.status(200).json({status:"success", result : getResult})

    }
else if(result.url == url){
    return res.status(200).json({status : "success",result :result})
  }
  else{
return res.status(404).json({status : "failed", error : "check error"})
  }
}
catch (err) {
    console.log(err)
    return res.status(400).json({status: "failed", error : err.messege})
}
    }
else{
    return res.status(404).json({status : "failed", error : "url not found"})
}
  }
catch(err){
    return res.status(404).json({status : "failed", error : err.messege})
}
}

const getDnsById = async (req, res) => {
    try{
        const id = req.params.id;
         if(id) {
          const result = await dnsModel.findOne({_id : id});
        
          if(result){
            return res.status(200).json({status: "success",data: result})
          }
          return res.status(400).json({status: 'failed', result : "can't find the data"})
         }
         return res.status(400).json({status: 'failed', result : 'Id is required'})
        }
        catch (error) {
          return res.status(400).json({status: "failed", error: error.message})
        }
}




module.exports = {
    getDnsDetails : getDnsDetails,
    getDnsById : getDnsById
}
