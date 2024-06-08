import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, CircularProgress, IconButton, Typography } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./style.css";
import { getUserProfile, saveProfileImage } from "../../redux/actions/profileActions";
import { Images } from "../../Images";
const { cameraIcon } = Images;

function UserProfileDashboard({ context }) {
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const isSmallScreen = useMediaQuery('(max-width:768px)');
    const dispatch = useDispatch()

    const { userProfile, loading, error } = useSelector(
        (state) => state.userProfileData || {}
    );

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        const validFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        const maxSize = 10 * 1024 * 1024;

        if (!validFileTypes.includes(file.type)) {
            alert('Invalid file type. Please select a PNG or JPEG image.');
            return;
        }

        if (file.size > maxSize) {
            alert('File size exceeds the 10MB limit. Please select a smaller file.');
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setImagePreviewUrl(imageUrl);

        const formData = new FormData();
        formData.append('profilePhoto', file);
        formData.append('userId', userProfile.id);

        dispatch(saveProfileImage(formData, context.token)).then(() => {
        })
            .catch((err) => {
                console.log("err", err)
            });
    };

    useEffect(() => {
        let isMounted = true;

        if (context?.token && isMounted) dispatch(getUserProfile(context.token))

        return () => { isMounted = false; };
    }, [context.token, dispatch])

    return (
        <div className="weather-dashboard-container flex-col align-center justify-content">
            <Typography
                style={{ marginBottom: "30px" }}
                variant="h5"
                className="flex-row align-center justify-center"
            >
                User Profile Information
            </Typography>
            <Card
                className="weather-card"
                style={{ marginTop: "20px" }}
                variant="outlined"
                sx={{ minWidth: isSmallScreen ? "fit-content" : 600, maxWidth: isSmallScreen ? "fit-content" : 700 }}
            >
                <CardContent className="flex-col justify-center align-center">
                    {loading && <CircularProgress />}
                    {error && !userProfile && <Typography color="error">{error}</Typography>}
                    {userProfile && (
                        <>
                            <Typography style={{ marginBottom: "20px" }} variant="h5">Say Hello</Typography>
                            <div className={`${isSmallScreen ? "flex-col" : "flex-row align-center"}`}>
                                <div style={{ width: "100%" }}>
                                    <Typography>
                                        {" "}
                                        <span style={{ fontWeight: "600" }}>Full Name:</span>{" "}
                                        {userProfile.username}
                                    </Typography>
                                    <Typography>
                                        {" "}
                                        <span style={{ fontWeight: "600" }}>Email Address:</span>{" "}
                                        {userProfile.email}
                                    </Typography>
                                </div>
                                <div>
                                    <IconButton style={{ position: "relative" }}>
                                        <Avatar
                                            src={imagePreviewUrl || userProfile?.profilePhoto}
                                            style={{
                                                margin: "10px",
                                                width: "200px",
                                                height: "200px",
                                                cursor: "auto"
                                            }}
                                        />
                                        <label style={{
                                            cursor: 'pointer', position: "absolute",
                                            bottom: "0%",
                                        }}>
                                            <Avatar
                                                src={cameraIcon}
                                                style={{
                                                    position: "relative",
                                                    margin: "10px",
                                                    width: "40px",
                                                    height: "40px",
                                                }}
                                            />
                                            <input
                                                type="file"
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    opacity: 0,
                                                    cursor: 'pointer'
                                                }}
                                                onChange={handleFileChange}
                                                multiple={false}
                                                accept="image/png, image/jpeg, image/jpg"

                                            />
                                        </label>

                                    </IconButton>
                                </div>
                            </div>
                        </>
                    )}

                </CardContent>
            </Card>
        </div>
    );
}

export default UserProfileDashboard;
