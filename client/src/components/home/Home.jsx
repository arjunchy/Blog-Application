import React from "react";
import { Grid, Fade } from "@mui/material";
import { useInView } from "react-intersection-observer"; 
import Banner from "../banner/Banner";
import Categories from "./Categories";
import Posts from "./post/Posts";

const Home = () => {
  const { ref: bannerRef, inView: bannerInView } = useInView({
    triggerOnce: true, 
    threshold: 0.1,
  });

  const { ref: categoriesRef, inView: categoriesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: postsRef, inView: postsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <div ref={bannerRef}>
        <Fade in={bannerInView} timeout={1000}>
          <div>
            <Banner />
          </div>
        </Fade>
      </div>

      <Grid container spacing={2}>
        <Grid item lg={2} sm={2} xs={2} ref={categoriesRef}>
          <Fade in={categoriesInView} timeout={1200}>
            <div>
              <Categories />
            </div>
          </Fade>
        </Grid>

        {/* Posts with scroll-triggered slide-in effect */}
        <Grid container item xs={12} sm={10} lg={10} ref={postsRef}>
          <Fade in={postsInView} timeout={1500}>
            <div>
              <Posts />
            </div>
          </Fade>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
