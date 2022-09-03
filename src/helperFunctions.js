import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
export const normalizeFetchedData = (data) => {
  let normalizedData = {};
  for (let key in data) {
    normalizedData[key] =
      data[key] === null || data[key] === undefined ? "" : data[key];
    if (
      typeof data[key] === "object" &&
      data[key] !== null &&
      !Array.isArray(data[key])
    ) {
      normalizedData[key] = normalizeFetchedData(data[key]); // use recursion for nested fields checking
    }
  }
  return normalizedData;
};

export const isValidEmail = (email) => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};
export const formatPhoneNumber = (phoneNumber) => {
  // return the formated number if valid or undefined if not
  phoneNumber = phoneNumber
    .replace("\u0660", "0")
    .replace("\u0661", "1")
    .replace("\u0662", "2")
    .replace("\u0663", "3")
    .replace("\u0664", "4")
    .replace("\u0665", "5")
    .replace("\u0666", "6")
    .replace("\u0667", "7")
    .replace("\u0668", "8")
    .replace("\u0669", "9"); // ٠٩١٤٢٦٧٣١٥ cases
  phoneNumber = phoneNumber.replace(/[^\d|+]/g, ""); //remove any non numerical char except "+" sign
  if (phoneNumber.length >= 8 && phoneNumber.length < 15) {
    if (phoneNumber.startsWith("00")) {
      phoneNumber = "+" + phoneNumber.substring(2); // 00218912129959 => +218912129959
    } else if (phoneNumber.startsWith("09")) {
      // Local case
      phoneNumber = "+218" + phoneNumber.substring(1); // 0912129599 => +218912129959
    }
    if (phoneNumber.charAt(0) !== "+") {
      phoneNumber = "+" + phoneNumber;
    }
    const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber);
    if (parsedPhoneNumber) {
      // check if number is valid
      return new AsYouType().input(phoneNumber); // +218912129599 => +218 91 2129959
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

export const validURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

export const download = (filename, text, type) => {
  let element = document.createElement("a");
  element.style.display = "none";
  element.setAttribute(
    "href",
    `data:text/${type};charset-utf-8,${encodeURIComponent(text)}`
  );
  element.setAttribute("download", filename);
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
