import api from "../api/api";

const userService = {
    sendVerificationCode: async ({ email, purpose }) => {
        try {
            const response = await api.post("/users/send-verification-code", { email, purpose });

            if (response.status >= 200 && response.status < 300) {
                return response.data;
            }

            throw new Error(response.data.message || "Không thể gửi mã OTP");
        } catch (error) {
            const errorMessage =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Không thể kết nối đến máy chủ";

            throw new Error(errorMessage);
        }
    },

    resetPassword: async ({ email, otp, newPassword }) => {
        try {
            const response = await api.post("/users/reset-password", {
                email,
                otp,
                newPassword,
            });

            if (response.status >= 200 && response.status < 300) {
                return response.data;
            }

            throw new Error(response.data.message || "Đổi mật khẩu thất bại");
        } catch (error) {
            const errorMessage =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Không thể kết nối đến máy chủ";

            throw new Error(errorMessage);
        }
    },
};

export default userService;