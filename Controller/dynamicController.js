const rowmodel = require('../Model/valuesModel')
const dynamicDataModel = require('../Model/dynamicDataModel')
const dynamicModel = require('../Model/dynamicDataModel')
const getRowData = async (req, res) => {
  try {
    const websiteId = req.body.websiteId;
    if (!websiteId) {
      return res.status(400).json({ status: 'error', message: "websiteId required" });
    }

    const resultData = await dynamicModel.find({ websiteId: websiteId });
    const dataArray = [];
    const result = await rowmodel.find({ websiteId: websiteId });
 for (let i = 0; i < result.length; i++) {
  for (let j = 0; j < resultData.length; j++) {
    const dataValue = result[i].value[resultData[j]._id];
    const header = {
      rowId: result[i]._id,
      id: resultData[j]._id.toString(),
      name: resultData[j].name,
      data: dataValue !== undefined ? dataValue : resultData[j].fieldType === "Multiselect" ? [] : ""
    };
    dataArray.push(header);
  }
}


    return res.status(200).json({
      status: 'success',
      headerCount: resultData.length,
      dataCount: dataArray.length,
      data: dataArray,
      headers: resultData
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: 'error', message: err });
  }
};



const deleteHeader = async (req, res) =>{
    try{
        const id = req.body.id
        if(!id){
            return res.status(400).json({status: 'error', message :"id is required"})
        }
        await dynamicDataModel.deleteOne({_id : id})
        try {
            await rowmodel.updateMany(
              { $unset: { [`value.${id}`]: '' } }
            );
            console.log("Object successfully deleted");
          } catch (err) {
            console.error(err);
            // Handle the error
          }
        return res.status(200).json({status: 'success', data: "succesfully deleted"})
    }
    catch(err){
        return res.status(400).json({status: 'error', message :err})
    }
}

const updateHeader = async (req, res) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const websiteId = req.body.websiteId;
    const fieldType = req.body.fieldType;
    const options = req.body.options;
      console.log(id)
    if (!id)
      return res.status(400).json({ status: 'error', message: 'ID is required' });

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
          const updateResult = await dynamicModel.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                name: name,
                fieldType: fieldType,
                options: data
              }
            }
          );
          try {
            await rowmodel.updateMany({ $unset: { [`value.${id}`]: '' } });
            console.log('Object successfully deleted');
          } catch (err) {
            console.error(err);
          }
          return res
            .status(200)
            .json({ status: 'success', message: 'Header successfully updated' });
        }
        return res
          .status(400)
          .json({ status: 'error', message: 'Options array must contain at least one non-empty option label' });
      } else if (
        fieldType === 'Textbox' ||
        fieldType === 'URL' ||
        fieldType === 'Email' ||
        fieldType === 'Textarea' ||
        fieldType === 'Checkbox' ||
        fieldType === 'Datepicker'
      ) {
        const updateResult = await dynamicModel.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              name: name,
              fieldType: fieldType,
              options: []
            }
          }
        );
        try {
          await rowmodel.updateMany({ $unset: { [`value.${id}`]: '' } });
          console.log('Object successfully deleted');
        } catch (err) {
          console.error(err);
        }
        return res.status(200).json({ status: 'success', message: 'Header successfully updated' });
      }
      console.log(fieldType);
      return res.status(400).json({
        status: 'error',
        message: "Invalid fieldType. Accepted values: ['Textbox','URL','Email', 'Singleselect', 'Multiselect', 'Textarea', 'Checkbox', 'Datepicker']"
      });
    }
    return res
      .status(400)
      .json({ status: 'error', message: 'Name and fieldType must be provided' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: 'error', message: err.message });
  }
};



module.exports = { getRowData : getRowData, updateHeader : updateHeader, deleteHeader : deleteHeader}
               