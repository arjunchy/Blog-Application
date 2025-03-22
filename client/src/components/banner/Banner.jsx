import { Box, Typography, styled } from "@mui/material";

const Banner = () => {

    const Image = styled(Box)`
background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/cover no-repeat #000;
width: 100vw;
height: 50vh;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`;

    const Heading = styled(Typography)`
font-size: 70px;
color: #ffff;
line-height: 1;
`;

    const SubHeading = styled(Typography)`
font-size: 20px;
background: #fff;
`;

    return (
        <Image>
            <Heading>Blog</Heading>
            <SubHeading>this is Banner</SubHeading>
        </Image>
    )
}

export default Banner;