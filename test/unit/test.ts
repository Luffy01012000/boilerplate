/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios2 from 'axios'
const BACKEND_URL = `http://localhost:8000/api/v1`

const axios = {
    post: async (...args: Parameters<typeof axios2.post>) => {
        try {
            const res = await axios2.post(...args)
            return res
        } catch (error: unknown) {
            if (axios2.isAxiosError(error)) {
                return error.response // Safely access the response
            }
            throw error
        }
    },
    get: async (...args: Parameters<typeof axios2.get>) => {
        try {
            const res = await axios2.get(...args)
            return res
        } catch (error: unknown) {
            if (axios2.isAxiosError(error)) {
                return error.response // Safely access the response
            }
            throw error
        }
    },
    put: async (...args: Parameters<typeof axios2.put>) => {
        try {
            const res = await axios2.put(...args)
            return res
        } catch (error: unknown) {
            if (axios2.isAxiosError(error)) {
                return error.response // Safely access the response
            }
            throw error
        }
    },
    delete: async (...args: Parameters<typeof axios2.delete>) => {
        try {
            const res = await axios2.delete(...args)
            return res
        } catch (error: unknown) {
            if (axios2.isAxiosError(error)) {
                return error.response // Safely access the response
            }
            throw error
            // const axiosError = error as { response?: any }; // Narrow the type
            // return axiosError.response;
        }
    }
}

describe('health', () => {
    test('Calling health route for application status', async () => {
        const res = await axios.get(`${BACKEND_URL}/health`)
        // expect(res.status).toBe(200);
        // console.log('res:', res);
        if (res) expect(res.status).toBe(200)
        if (res && res?.data) expect(res.data.statusCode).toBe(200)
    })
})

// describe('Auth', () => {
//     test('User is able to signup only once per username', async () => {
//         const username = 'Rutvik2024' + Math.random() + '@gmail.com';
//         const password = '1234567890';

//         const response = await axios.post(`${BACKEND_URL}/signup`, {
//             username,
//             password,
//             type: 'admin'
//         });
//         if (response) expect(response.status).toBe(200);
//         if (response) expect(response.data.statusCode).toBe(200);

//         const updatedResponse = await axios.post(`${BACKEND_URL}/signup`, {
//             username,
//             password,
//             type: 'admin'
//         });
//         if (updatedResponse) expect(updatedResponse.status).toBe(400);
//     });

//     test('Signup fails if username is empty', async () => {
//         const password = '1234567890';

//         const response = await axios.post(`${BACKEND_URL}/signup`, {
//             password,
//             type: 'admin'
//         });
//         if (response) expect(response.status).toBe(400);
//     });

//     test('Signup fails if password is empty', async () => {
//         const username = 'Rutvik' + Math.random();

//         const response = await axios.post(`${BACKEND_URL}/signup`, {
//             username,
//             type: 'admin'
//         });
//         if (response) expect(response.status).toBe(400);
//     });

//     test('Signup fails if type is empty', async () => {
//         const username = 'Rutvik2025' + Math.random();
//         const password = '1234567890';

//         const response = await axios.post(`${BACKEND_URL}/signup`, {
//             username,
//             password
//         });
//         if (response) expect(response.status).toBe(400);
//     });

//     test('SignIn succeds if the username and password is correct', async () => {
//         const username = 'Rutvik2023' + Math.random() + '@gmail.com';
//         const password = '1234567890';

//         await axios.post(`${BACKEND_URL}/signup`, {
//             username,
//             password,
//             type: 'user'
//         });

//         const response = await axios.post(`${BACKEND_URL}/signin`, {
//             username,
//             password
//         });
//         if (response) expect(response.status).toBe(200);
//         if (response) expect(response.data.statusCode).toBeDefined();
//         if (response) expect(String(response.data.statusCode)).toMatch(/^\d+$/);
//         if (response) expect(response.data.data.token).toBeDefined();
//         if (response) expect(response.data.data.token).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
//     });

//     test('SignIn fails if the username and password is Incorrect', async () => {
//         const username = 'Rutvik2022' + Math.random();
//         const password = '1234567890';

//         await axios.post(`${BACKEND_URL}/signup`, {
//             username,
//             password,
//             type: 'user'
//         });

//         const response = await axios.post(`${BACKEND_URL}/signin`, {
//             username: 'WrongUserName',
//             password
//         });
//         if (response) expect(response.status).toBe(403);
//     });
// });

// describe.skip("User Metadata endpoints", () => {
//   let token = "";
//   let avatarId = "";
//   beforeAll(async () => {
//     const username = "Rutvik" + Math.random();
//     const password = "1234567890";

//     await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//     });

//     const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//       username,
//       password,
//     });

//     token = response.data.token;

//     const avatarResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/avatar`,
//       {
//         imageUrl: "",
//         name: "Timmy",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     expect(avatarResponse.statusCode).toBe(200);
//     avatarId = avatarId.data.avatarId;
//   });

//   // beforeEach(()=>{
//   // });

//   test("User can't update their metadata with wrong token", async () => {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/user/metadata`,
//       {
//         avatarId: "124123",
//       },
//       {
//         headers: {
//           authorization: `Bearer 1124343`,
//         },
//       }
//     );
//     expect(response.statusCode).toBe(403);
//   });

//   test("User can't update their metadata with wrong avatarId", async () => {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/user/metadata`,
//       {
//         avatarId: "124123",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     expect(response.statusCode).toBe(403);
//   });

//   test("User is not able to update their metadata if the auth header is not present", async () => {
//     const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
//       avatarId,
//     });
//     expect(response.statusCode).toBe(403);
//   });

//   test("User can update their metadata with correct avatarId", async () => {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/user/metadata`,
//       {
//         avatarId,
//       },
//       {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     expect(response.statusCode).toBe(200);
//   });
// });

// describe.skip("User avatar Information", () => {
//   let avatarId;
//   let token;
//   let userId;
//   beforeAll(async () => {
//     const username = "Rutvik" + Math.random();
//     const password = "1234567890";

//     const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       type: "admin",
//     });

//     userId = signupResponse.data.userId;

//     const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//       username,
//       password,
//     });

//     token = response.data.token;

//     const avatarResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/avatar`,
//       {
//         imageUrl: "",
//         name: "Timmy",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     expect(avatarResponse.statusCode).toBe(200);
//     avatarId = avatarId.data.avatarId;
//   });
// });

// add .skip after describe to skip that suite

