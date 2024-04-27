"use client";

import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { useRouter } from "next/navigation";
import { supabase } from "../../../utils/supabase/server";
import { SubmitHandler, useForm } from "react-hook-form";
import { State } from "../../../types";
import { Card, Title } from "@tremor/react";
import Image from "next/image";


interface ProfileInfo {
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string; // Change type to string as zip codes can contain non-numeric characters
}

export default function Profile() {
  const user = useUser();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInfo>({
    defaultValues: {
      name: user.userName,
      address1: user.userAddress1,
      address2: user.userAddress2, // This can be undefined or optional
      city: user.userCity,
      state: user.userState,
      zip: user.userZip,
    },
  });

  const [editMode, setEditMode] = useState(false);

  // const [states, setStates] = useState<State[]>([]);
  const states = [
  {
    "id": 1,
    "state_name": "Alabama",
    "state_abbreviation": "AL"
  },
  {
    "id": 2,
    "state_name": "Alaska",
    "state_abbreviation": "AK"
  },
  {
    "id": 3,
    "state_name": "Arizona",
    "state_abbreviation": "AZ"
  },
  {
    "id": 4,
    "state_name": "Arkansas",
    "state_abbreviation": "AR"
  },
  {
    "id": 5,
    "state_name": "California",
    "state_abbreviation": "CA"
  },
  {
    "id": 6,
    "state_name": "Colorado",
    "state_abbreviation": "CO"
  },
  {
    "id": 7,
    "state_name": "Connecticut",
    "state_abbreviation": "CT"
  },
  {
    "id": 8,
    "state_name": "Delaware",
    "state_abbreviation": "DE"
  },
  {
    "id": 9,
    "state_name": "Florida",
    "state_abbreviation": "FL"
  },
  {
    "id": 10,
    "state_name": "Georgia",
    "state_abbreviation": "GA"
  },
  {
    "id": 11,
    "state_name": "Hawaii",
    "state_abbreviation": "HI"
  },
  {
    "id": 12,
    "state_name": "Idaho",
    "state_abbreviation": "ID"
  },
  {
    "id": 13,
    "state_name": "Illinois",
    "state_abbreviation": "IL"
  },
  {
    "id": 14,
    "state_name": "Indiana",
    "state_abbreviation": "IN"
  },
  {
    "id": 15,
    "state_name": "Iowa",
    "state_abbreviation": "IA"
  },
  {
    "id": 16,
    "state_name": "Kansas",
    "state_abbreviation": "KS"
  },
  {
    "id": 17,
    "state_name": "Kentucky",
    "state_abbreviation": "KY"
  },
  {
    "id": 18,
    "state_name": "Louisiana",
    "state_abbreviation": "LA"
  },
  {
    "id": 19,
    "state_name": "Maine",
    "state_abbreviation": "ME"
  },
  {
    "id": 20,
    "state_name": "Maryland",
    "state_abbreviation": "MD"
  },
  {
    "id": 21,
    "state_name": "Massachusetts",
    "state_abbreviation": "MA"
  },
  {
    "id": 22,
    "state_name": "Michigan",
    "state_abbreviation": "MI"
  },
  {
    "id": 23,
    "state_name": "Minnesota",
    "state_abbreviation": "MN"
  },
  {
    "id": 24,
    "state_name": "Mississippi",
    "state_abbreviation": "MS"
  },
  {
    "id": 25,
    "state_name": "Missouri",
    "state_abbreviation": "MO"
  },
  {
    "id": 26,
    "state_name": "Montana",
    "state_abbreviation": "MT"
  },
  {
    "id": 27,
    "state_name": "Nebraska",
    "state_abbreviation": "NE"
  },
  {
    "id": 28,
    "state_name": "Nevada",
    "state_abbreviation": "NV"
  },
  {
    "id": 29,
    "state_name": "New Hampshire",
    "state_abbreviation": "NH"
  },
  {
    "id": 30,
    "state_name": "New Jersey",
    "state_abbreviation": "NJ"
  },
  {
    "id": 31,
    "state_name": "New Mexico",
    "state_abbreviation": "NM"
  },
  {
    "id": 32,
    "state_name": "New York",
    "state_abbreviation": "NY"
  },
  {
    "id": 33,
    "state_name": "North Carolina",
    "state_abbreviation": "NC"
  },
  {
    "id": 34,
    "state_name": "North Dakota",
    "state_abbreviation": "ND"
  },
  {
    "id": 35,
    "state_name": "Ohio",
    "state_abbreviation": "OH"
  },
  {
    "id": 36,
    "state_name": "Oklahoma",
    "state_abbreviation": "OK"
  },
  {
    "id": 37,
    "state_name": "Oregon",
    "state_abbreviation": "OR"
  },
  {
    "id": 38,
    "state_name": "Pennsylvania",
    "state_abbreviation": "PA"
  },
  {
    "id": 39,
    "state_name": "Rhode Island",
    "state_abbreviation": "RI"
  },
  {
    "id": 40,
    "state_name": "South Carolina",
    "state_abbreviation": "SC"
  },
  {
    "id": 41,
    "state_name": "South Dakota",
    "state_abbreviation": "SD"
  },
  {
    "id": 42,
    "state_name": "Tennessee",
    "state_abbreviation": "TN"
  },
  {
    "id": 43,
    "state_name": "Texas",
    "state_abbreviation": "TX"
  },
  {
    "id": 44,
    "state_name": "Utah",
    "state_abbreviation": "UT"
  },
  {
    "id": 45,
    "state_name": "Vermont",
    "state_abbreviation": "VT"
  },
  {
    "id": 46,
    "state_name": "Virginia",
    "state_abbreviation": "VA"
  },
  {
    "id": 47,
    "state_name": "Washington",
    "state_abbreviation": "WA"
  },
  {
    "id": 48,
    "state_name": "West Virginia",
    "state_abbreviation": "WV"
  },
  {
    "id": 49,
    "state_name": "Wisconsin",
    "state_abbreviation": "WI"
  },
  {
    "id": 50,
    "state_name": "Wyoming",
    "state_abbreviation": "WY"
  }
]
  useEffect(() => {
    // async function fetchStates() {
    //   const { data, error } = await supabase.from("states").select();

    //   if (error) {
    //     console.error("Error fetching states:", error);
    //   } else {
    //     setStates(data);
    //   }
    // }
    // fetchStates();

    const checkUser = async () => {
      if (user.isLoggedIn && typeof user.userAddress1 === 'undefined') { // Check for undefined
        // If userAddress1 is undefined, log out and redirect
        await user.logoutUser(); // Assuming logoutUser is asynchronous
        router.push('/'); // Redirect after logging out
      }
    };

    checkUser(); // Call the asynchronous function to check user address
  }, []);

  const onSubmit: SubmitHandler<ProfileInfo> = async (insertData) => {
    try {
      const { data, error } = await supabase
        .from("customers")
        .update({
          name: insertData.name,
          address1: insertData.address1,
          address2: insertData.address2,
          city: insertData.city,
          state: insertData.state,
          zip: insertData.zip,
        }) // Match column name
        .match({ id: user.userNumber });

      if (error) {
        console.error("Error updating user:", error);
        alert("Failed to update profile!");
      } else {
        console.log("User updated successfully:", data);
        setEditMode(false); // Switch back to view mode
        user.setUserName(insertData.name); // Update user context
        user.setUserAddress1(insertData.address1);
        user.setUserAddress2(insertData.address2);
        user.setUserCity(insertData.city);
        user.setUserState(insertData.state);
        user.setUserZip(insertData.zip);
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
    }
  };

  return (
    <>    
        <div
        className="relative block group"
        style={{
            display: "block",
            width: "100vw",
            minHeight: "100vh", // Ensure the page is at least as tall as the viewport
            overflow: "hidden",
            position: "relative" // Ensure the container has relative positioning
        }}
        >
        {/* Background overlay */}
        <div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
            style={{ zIndex: -1 }} // Ensure the overlay is behind the image
        />
        
        {/* Image */}
        <div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -2 }}>
            <Image
            src="/images/background.jpg"
            layout="fill"
            objectFit="cover"
            alt="Background Image"
            />
        </div>
    <main className="px-4 md:p-10 mx-auto max-w-7xl bg-gray-50 pt-10">
                <div className='flex justify-between'>
                    <div>
                            <Title>Profile</Title>
                            
                        </div>
                        <div className='flex justify-end items-end	' style={{marginLeft:"8.8rem"}}>
                        
                            <button
                              className="flex items-center justify-center bg-blue-500 w-28 h-8 rounded"
                              onClick={() => setEditMode(true)}
                              data-testid="editbutton"
                              >
                              <img
                                  src="/images/edit.png"
                                  alt="Edit"
                                  className="filter invert w-5 h-5  mr-2" // Proper margin between icon and text
                              />
                              <span className="text-white  text-xs align-middle  text-center	">Edit</span>
                            </button>
                        
                    </div>
                </div>
                    
        
        <Card className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-6" style={{marginTop:".5rem"}}>
        
        <div className="mt-4">
          {editMode ? (
            <>
            <div className="text-center block text-gray-700 text-2xl font-bold mb-2">Edit Profile</div>
            <div className="flex justify-center items-center">
              <form
                data-testid="profileform"
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("name", { required: true, maxLength: 50 })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    data-testid="name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs italic">
                      {errors.name.type === "required"
                        ? "Required."
                        : "At most 50 characters."}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="address1"
                  >
                    Address 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("address1", {
                      required: true,
                      maxLength: 100,
                    })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="address1"
                    type="text"
                    placeholder="Address 1"
                    data-testid="address1"
                  />
                  {errors.address1 && (
                    <p className="text-red-500 text-xs italic">
                      {errors.address1.type === "required"
                        ? "Required."
                        : "At most 100 characters."}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="address2"
                  >
                    Address 2
                  </label>
                  <input
                    {...register("address2", { maxLength: 100 })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="address2"
                    type="text"
                    placeholder="Address 2"
                  />
                  {errors.address2 && (
                    <p className="text-red-500 text-xs italic">
                      {errors.address2.type === "maxLength"
                        ? "At most 100 characters."
                        : ""}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="city"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("city", { required: true, maxLength: 100 })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="city"
                    type="text"
                    placeholder="City"
                    data-testid="city"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs italic">
                      {errors.city.type === "required"
                        ? "Required."
                        : "At most 100 characters."}
                    </p>
                  )}
                </div>

                <div className="flex mb-4">
                  {/* State field */}
                  <div className="w-1/2 pr-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="state"
                    >
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("state", { required: true })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="state"
                      data-testid="state"
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.id} value={state.state_abbreviation}>
                          {state.state_abbreviation}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-red-500 text-xs italic">Required.</p>
                    )}
                  </div>
                  {/* ZIP field */}
                  <div className="w-1/2 pl-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="zip"
                    >
                      ZIP <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("zip", {
                        required: true,
                        maxLength: 9,
                        minLength: 5,
                        pattern: /^\d+$/,
                      })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="zip"
                      type="text"
                      placeholder="ZIP"
                      data-testid="zip"
                    />
                    {errors.zip && (
                      <p className="text-red-500 text-xs italic">
                        {errors.zip.type === "required"
                          ? "Required."
                          : errors.zip.type === "maxLength"
                          ? "At most 9 characters."
                          : errors.zip.type === "pattern"
                          ? "Invalid ZIP code."
                          : "At least 5 characters."}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-center">
                <button
                    onClick={() => setEditMode(false)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold mr-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                    
                  <button
                    data-testid="sumbit-edit"
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                </div>
              </form>
              </div>
            </>
            
          ) : (
            <>
            <h1 className="text-xl font-bold text-gray-900 mb-2">
            Welcome, {user.userName}
            </h1>
              <p className="text-gray-600">
                <span className="font-semibold">Address:</span> {user.userAddress1} {user.userAddress2}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">City:</span> {user.userCity}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">State:</span> {user.userState}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">ZIP:</span> {user.userZip}
              </p>
            </>
          )}
        </div>
      </Card>

        </main>
    </div>
    </>
  );
}
