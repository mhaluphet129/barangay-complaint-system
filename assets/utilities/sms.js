import { message } from "antd";
import axios from "axios";

class SMS {
  constructor(key) {
    this.key = key;
  }

  async sendMessage(phone, message) {
    return new Promise(async (resolve, reject) => {
      let response = await axios.get("https://sms.teamssprogram.com/api/send", {
        params: {
          key: this.key,
          phone,
          message,
        },
      });
      if (response.data.status == 200) {
        resolve({
          success: true,
          data: response.data.data,
        });
      } else {
        reject({
          success: false,
          message: response.data.message,
        });
      }
    });
  }

  async getSentSms({ limit = 10, page = 1 }) {
    return new Promise(async (resolve, reject) => {
      let response = await axios.get(
        "https://sms.teamssprogram.com/api/get/sent",
        {
          params: {
            key: this.key,
            limit,
            page,
          },
        }
      );

      if (response.data.status == 200) {
        new Promise.all(
          response.data.data.map((e, i) => {
            return new Promise(async (resolve, reject) => {
              let res = await axios.get("/api/sms/is-registered-as-complain", {
                params: {
                  number: e.phone,
                },
              });

              if (res.data?.success ?? false) {
                resolve({
                  index: i,
                  bool: res.data.isRegistered,
                });
              }
            });
          })
        ).then((e) => {
          if (e && e.length > 0) {
            e.forEach((_) => {
              response.data.data[_.index] = {
                ...response.data.data[_.index],
                toComplain: _.bool,
              };
            });
          }
          resolve({
            success: true,
            data: response.data.data,
          });
        });
      } else {
        reject({
          success: false,
        });
      }
    });
  }

  async getReceivedSms({ limit = 10, page = 1 }) {
    return new Promise(async (resolve, reject) => {
      let response = await axios.get(
        "https://sms.teamssprogram.com/api/get/received",
        {
          params: {
            key: this.key,
            limit,
            page,
          },
        }
      );
      if (response.data.status == 200) {
        resolve({
          success: true,
          data: response.data.data,
        });
      } else {
        reject({
          success: false,
        });
      }
    });
  }

  async toComplain(sms, inchargeId) {
    sms.type = "inbound";
    sms.originator = inchargeId;
    // {
    //   "api": Boolean,
    //   "device": Number,
    //   "message": string,
    //   "phone": string,
    //   "priority": Boolean,
    //   "sim": Number,
    //   "timestamp": Number
    // }
    return await axios
      .post("/api/sms/create-sms", sms)
      .then(async (response) => {
        if (response.data?.success) {
          // create a complain
          return await axios
            .post("/api/complain/new-complain", {
              inchargeId,
              isResponded: true,
              respondentNumber: sms.phone,
            })
            .then((e) => {
              message.success("Successfully registered as complain");
              return {
                success: true,
                sms: response.data,
              };
            });
        } else {
          return {
            success: false,
          };
        }
      });
  }
}

export default SMS;
