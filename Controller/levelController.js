const {levelModel} = require('../Model/levelModel');
const {sitemapModel} = require('../Model/sitemapModel');
const getLevels = async (req, res) => {
    try{
        const id = req.params.id
        if(id){
    const data = await sitemapModel.findOne({_id : id})
    const resultArray = data.sitemap
    const levels = []
    for(let i = 0; i < data.sitemap.length;i++){
        var str = data.sitemap[i].url;
        var name = str.split('/')
                if(name.length > 3){
                    levels.push({
                        url : str,
                        level1 : name[3] || '',
                        level2 : name[4] || '' ,
                        level3 : name[5] || '',
                        level4 : name[6] || '',
                        level5 : name[7] || ''
                });

    }
}
    return res.status(200).json({status: "success", result : levels})
}
return res.status(404).json({status: "failed", error : 'Id correct url'})
}
    // return res.status(404).json({status: "failed",error: 'string required'})
    // }
//     return res.status(404).json({status: "failed",error: 'Id required'})

    catch(err){
        console.log(err)
        return res.status(404).json({status: "failed",error: err.message})
    }
}



module.exports = {
    getLevels : getLevels
}