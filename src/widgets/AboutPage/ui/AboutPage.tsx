"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const fadeIn = (direction = "up", delay = 0) => {
  return {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: "easeOut",
      },
    },
  };
};

const AboutPage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  return (
    <div className="mb-[70px]">
      <motion.h1
        className="title-h1 bona"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        О бренде
      </motion.h1>
      {/* =========================== */}
      <div className="flex flex-col gap-[20px] mt-[60px]">
        <motion.div
          className="flex flex-col mindesk:flex-row justify-center gap-[40px] items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative">
            <motion.div className="max-w-[550px] w-full" variants={fadeIn("left", 0.3)} style={{ y: y1 }}>
              <Image
                width={550}
                height={730}
                src="https://lesyanebo.com/local/templates/nebo_2022/images/about-lesya.jpg"
                alt=""
                className="shadow-lg"
              />
            </motion.div>
          </div>
          <motion.div className="max-w-[850px] mindesk:max-w-[450px] w-full" variants={fadeIn("right", 0.5)}>
            <motion.h2
              className="text-[20px] tablet:text-[25px] laptop:text-[30px] mb-[50px] text-text bona"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Lesyanebo был создан Олесей Шиповской в 2014 году.
            </motion.h2>
            <motion.p
              className="text-[20px] tablet:text-[25px] laptop:text-[30px] text-text bona"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Бренд Lesyanebo — это идеальный баланс маскулинности и женственности, подходящий как для повседневной
              жизни, так и для особых случаев.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col-reverse mindesk:flex-row justify-center gap-[40px] items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="max-w-[850px] mindesk:max-w-[450px] text-right w-full" variants={fadeIn("left", 0.3)}>
            <motion.h2
              className="text-[20px] tablet:text-[25px] laptop:text-[30px] mb-[50px] text-text bona"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Lesyanebo был создан Олесей Шиповской в 2014 году.
            </motion.h2>
            <motion.p
              className="text-[20px] tablet:text-[25px] laptop:text-[30px] text-text bona"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Бренд Lesyanebo — это идеальный баланс маскулинности и женственности, подходящий как для повседневной
              жизни, так и для особых случаев.
            </motion.p>
          </motion.div>
          <div className="relative">
            <motion.div className="max-w-[550px] mb-[50px] w-full" variants={fadeIn("right", 0.5)} style={{ y: y2 }}>
              <Image
                width={550}
                height={730}
                src="https://lesyanebo.com/upload/resize_cache/iblock/e9a/1380_2760_1/idhpbzr0zy0rhpegyzz5ll8va6tiip5e.jpg"
                alt=""
                className="shadow-lg"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
      {/* ======================== */}
    </div>
  );
};

export default AboutPage;
