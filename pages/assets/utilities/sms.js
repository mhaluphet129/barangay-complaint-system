import axios from "axios";
import { SMSnotInComplain } from ".";

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
        console.log(response.data);
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

  async getSms({ limit = 10, page = 1 }) {
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

    // return await SMSnotInComplain(response.data).then(() => {
    //   if (response.status == 200) {
    //     return {
    //       success: true,
    //       sms: response.data,
    //     };
    //   } else {
    //     return {
    //       success: false,
    //     };
    //   }
    // });
  }
}

export default SMS;
