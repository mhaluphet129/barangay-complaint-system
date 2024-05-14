import { message } from "antd";
import axios from "axios";
import dayjs from "dayjs";

class SMS {
  constructor(key) {
    this.key = key;
  }

  async getDevices() {
    return new Promise(async (resolve, reject) => {
      let response = await axios.get(
        "https://sms.teamssprogram.com/api/get/devices",
        {
          params: {
            secret: this.key,
          },
        }
      );

      if (response.data.status == 200)
        resolve({ success: true, data: response.data.data });
      else
        reject({
          success: false,
          message: response.data.message,
        });
    });
  }

  async sendMessage(phone, message, device) {
    return new Promise(async (resolve, reject) => {
      let response = await axios.get(
        "https://sms.teamssprogram.com/api/send/sms",
        {
          params: {
            secret: this.key,
            mode: "devices",
            phone,
            message,
            device,
            priority: 1,
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
          message: response.data.message,
        });
      }
    });
  }

  async getSentSms({ limit = 10, page = 1 }) {
    return new Promise(async (resolve, reject) => {
      let response = await axios.get(
        "https://sms.teamssprogram.com/api/get/sms.sent",
        {
          params: {
            secret: this.key,
            limit,
            page,
          },
        }
      );

      if (response.data.status == 200) {
        Promise.all(
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
        "https://sms.teamssprogram.com/api/get/sms.received",
        {
          params: {
            secret: this.key,
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
    // sms.type = "inbound";
    // sms.originator = inchargeId;
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
      .post("/api/complain/new-complain", {
        inchargeId,
        isResponded: false,
        complainerNumber: sms.number,
      })
      .then((e) => {
        message.success("Successfully registered as complain");
        return {
          success: true,
        };
      });
  }

  async sendBulk(device, numbers, message) {
    return new Promise(async (resolve, reject) => {
      numbers = numbers.map((e) => `+63${e}`).join(",");
      let response = await axios.get(
        "https://sms.teamssprogram.com/api/send/sms.bulk",
        {
          params: {
            secret: this.key,
            mode: "devices",
            campaign: dayjs().format("MMM DD, YYYY - hh:mma"),
            numbers,
            device,
            message,
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

  async deleteSentSms(id) {
    return new Promise(async (resolve, reject) => {
      let response = await axios.get(
        "https://sms.teamssprogram.com/api/delete/sms.sent",
        {
          params: {
            secret: this.key,
            id,
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
}

export default SMS;
