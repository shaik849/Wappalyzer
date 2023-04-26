const mongoose = require('mongoose');
const { Schema } = mongoose;

const dnsSchema = new Schema({
  url : {
   type: String
  },
    ARecord: [
    {
        type : String
    }
  ],
  AAAARecord : [{
    type : String
  }],
  MxRecord: [{
     exchange : {
        type : String
     },
     priority : {
        type : Number
     }
  }],
  NsRecord : [{
    type : String
  }],
  SOA : [{
  nsname: {
    type : String
  },
  hostmaster: {
    type : String
  },
  serial: {
    type : Number
  },
  refresh: {
    Number
  },
  retry: {
    type: Number
  },
  expire: {
    type : Number
  },
  minttl: {
    type : Number
  }
}]
}, {timestamps: true})

const dnsModel = mongoose.model('DNS', dnsSchema);

module.exports = {dnsModel}