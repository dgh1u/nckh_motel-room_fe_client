import axios from "@/axios";

export const paymentApi = async (data) => {
  return axios({
    url: "/api/payment/create",
    method: "POST",
    data: data,
  }).then((response) => {
    return response;
  });
};

export const getListPayment = async (params) => {
  return axios({
    url: "/api/payment",
    method: "GET",
    params: params,
  });
};

export const getPaymentResult = async (id) => {
  return axios({
    url: `/api/payment/result/${id}`,
    method: "GET",
  });
};
