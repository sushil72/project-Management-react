import api from "../../Redux/Auth/api";

export const createPayment = async ({ planType, jwt }) => {
  try {
    const { data } = await api.post(`/api/payments/${planType.toUpperCase()}`, {
      headers: {
        Authorization: jwt,
      },
    });

    if (data.payment_link_url) {
      window.location.href = data.payment_link_url; // Corrected typo here
    }
  } catch (error) {
    console.log("error:", error);
  }
};
