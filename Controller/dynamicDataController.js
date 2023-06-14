const dynamicModel = require('../Model/dynamicDataModel')
const rowmodel = require('../Model/valuesModel')

const dynamicData = async (req, res) => {
    try{
      const name =req.body.name
      const fieldType = req.body.fieldType
      const websiteId = req.body.websiteId
      const options = req.body.options
        // return res.status(200).json({data : data})
        // const value = label.toLowerCase().replaceAll(" ", "")
        if (name && fieldType) {
          if (name && (fieldType === 'Singleselect' || fieldType === 'Multiselect')) {
            if (options && options.length > 0) {
              const label = options.map((option) => option.label.trim()).filter((label) => label !== "");
              if(label==[] || options.length !== label.length){
                return res
              .status(400)
              .json({ status: 'error', message: 'empty or space not accepted' });
              }
              const value = label.map((element) => {
                return { value: element.toLowerCase().replaceAll(' ', '') };
              });
              const data = [];
              for (let i = 0; i < label.length; i++) {
                data.push({
                  label: label[i],
                  value: value[i].value
                });
              }
            const resultDynamicColumn = new dynamicModel({
                name : name,
                fieldType : fieldType,
                websiteId : websiteId,
                options : data
             })
             await resultDynamicColumn.save()
             return res.status(200).json({status : "success",data : {name :name, fieldType : fieldType, websiteId : websiteId, options : data}})
        }
           return res.status(400).json({status: 'error', messege: 'Enter atleast one'})
      }
      else{
         const resultDynamicColumn = new dynamicModel({
            name : name,
            fieldType : fieldType,
            websiteId : websiteId,
         })
         await resultDynamicColumn.save()
         return res.status(200).json({status : "success",data :{name :name, fieldType : fieldType, websiteId : websiteId}})
      }
    }
      return res.status(400).json({status: 'error',messege : 'fieldname and name required'})
    }
    catch(err){
      console.log(err)
        return res.status(400).json({status: 'error',messege : err})
    }
}

const getDynamicHeaders = async (req, res) => {
  try {
    const id = req.body.id;
    const _id = req.body._id;
    const data = req.body.data;

    if (id && _id) {
      const findDynamic = await rowmodel.findOne({ _id: _id });
      const result = await dynamicModel.findOne({ _id: id });
      if (findDynamic && result && (data !== "" || data === " ")) {
        if (result.fieldType === "URL") {
          function validateURL(url) {
            const regex = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.]*)*\/?$/i;
            return regex.test(url);
          }

          const url = data;
          const isValid = validateURL(url);

          if (isValid) {
            await getData(id, _id ,url);
            return res
              .status(200)
              .json({ status: "success", data: "updated successfully" });
          } else {
            return res
              .status(400)
              .json({ status: "error", message: "check URL" });
          }
        }

        if (result.fieldType === "Textbox") {
          if (data.length <= 50) {
            await getData(id, _id,data);
            return res
              .status(200)
              .json({ status: "success", data: "updated successfully" });
          } else {
            return res
              .status(400)
              .json({ status: "error", message: "accepts 50 characters only" });
          }
        }

        if (result.fieldType === "Textarea") {
          if (data.length <= 255) {
            await getData(id,_id,data);
            return res
              .status(200)
              .json({ status: "success", data: "updated successfully" });
          } else {
            return res
              .status(400)
              .json({ status: "error", message: "accepts 255 characters only" });
          }
        }

        if (result.fieldType === "Email") {
          function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
          }

          const email = data;
          const isValid = isValidEmail(email);

          if (isValid) {
            await getData(id,_id, email);
            return res
              .status(200)
              .json({ status: "success", data: "updated successfully" });
          } else {
            return res
              .status(400)
              .json({ status: "error", message: "check the email" });
          }
        }

        if (result.fieldType === "Singleselect") {
          const resultData = await dynamicModel.findOne({ _id: id });
          let str;

          for (let i = 0; i < resultData.options.length; i++) {
            if (resultData.options[i].label === data) {
              str = data;
            }
          }

          if (str === data) {
            await getData(id,_id, str);
            return res
              .status(200)
              .json({ status: "success", data: "updated successfully" });
          } else {
            return res
              .status(400)
              .json({ status: "error", message: "check the options" });
          }
        }

        if (result.fieldType === "Multiselect") {
          const resultData = await dynamicModel.findOne({ _id: id });
          console.log(resultData)
          const myData = [];
         console.log(data)
          for (let i = 0; i < resultData.options.length; i++) {
            if (data.includes(resultData.options[i].label)) {
              const result = resultData.options[i].value;
              myData.push({ label: resultData.options[i].label, value: result });
            }
          }

          if (myData.length > 0) {
            await getData(id,_id, myData);
            return res
              .status(200)
              .json({ status: "success", data: "updated successfully" });
          } else {
            return res
              .status(400)
              .json({ status: "error", message: "check the options" });
          }
        }

        if (result.fieldType === "Datepicker") {
          function isValidDate(dateString) {
            const dateRegex = /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(\d{4})$/;
            if (!dateRegex.test(dateString)) {
              return false; // Invalid format
            }

            const [month, day, year] = dateString.split("-");
            const date = new Date(year, month - 1, day);

            if (
              date.getMonth() + 1 !== parseInt(month, 10) ||
              date.getDate() !== parseInt(day, 10) ||
              date.getFullYear() !== parseInt(year, 10)
            ) {
              return false; // Invalid date values
            }

            return true; // Valid date
          }

          const date = data;

          if (isValidDate(data)) {
            await getData(id,_id,date);
            return res
              .status(200)
              .json({ status: "success", data: "updated successfully" });
          } else {
            return res
              .status(400)
              .json({ status: "error", message: "Invalid date type" });
          }
        }
      }
      return res
        .status(400)
        .json({ status: "error", message: "data not found" });
    }

    return res
      .status(400)
      .json({ status: "error", message: "id or _id required" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

async function getData(id,_id ,data) {
  try {
    console.log(id)
    const findData = await rowmodel.findOne({ _id: _id });
    if (findData == null) {
      return { status: "error", message: "Table not found" };
    } 
    else {
        await rowmodel.findOneAndUpdate(
        { _id: _id },
        { $set: { [`value.${id}`]: data } },
        { upsert: true, new: true }
      );
      return { status: "success", data: "updated successfully" };
    }
  } catch (err) {
    console.error(err);
    return { status: "error", message: "Internal Server Error" };
  }
}



const getHeaders = async (req, res) => {
    try{
        const headerId = req.body.headerId
        if(!headerId){
          return res.status(404).json({status: "error", messege : "headerId required"})
        }
        const headerExit = await dynamicModel.findOne({_id :headerId});
        if(!headerExit){
          return res.status(404).json({status: "error", messege : "heading is not found"})
        }
       const newData = new rowmodel({
        headerId : headerId,
        websiteId : headerExit.websiteId,
        value : {
        }
      }) 
     await newData.save()
       return res.status(200).json({status: "success",data : "row created successfully"})
    }
    catch(err){
      console.log(err)
        return res.status(400).json({status: "error",error : err})
    }
}



module.exports = {dynamicData: dynamicData, getDynamicHeaders : getDynamicHeaders, getHeaders: getHeaders}