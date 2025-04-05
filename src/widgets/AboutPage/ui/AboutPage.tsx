"use client";

import React from "react";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import img1 from "../../../../public/images/About/img1.png";
import img2 from "../../../../public/images/About/img2.png";
import img3 from "../../../../public/images/About/img3.jpg";
import img4 from "../../../../public/images/About/img4.jpg";
import "../styles/about.scss";

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
    <div>
      <motion.h1
        className="font-semibold mt-[100px] text-center mb-0 text-[36px] text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        О компании
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
              <Image width={550} height={630} loading="lazy" src={img3} alt="" className="shadow-lg" />
            </motion.div>
          </div>
          <motion.div className="max-w-[850px] mindesk:max-w-[450px] w-full" variants={fadeIn("right", 0.5)}>
            <motion.p
              className="text-[18px] tablet:text-[20px] laptop:text-[20px] text-text font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Siveno — это воплощение современной женственности, сочетающее в себе элегантность, комфорт и
              непринужденный стиль.
            </motion.p>
            <br />
            <motion.p
              className="text-[18px] tablet:text-[20px] laptop:text-[20px] text-text font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Мы создаем не просто вещи, а пространство для женщины, которая ценит гармонию в жизни и качество в вещах.
              Siveno - это про уверенность быть собой, про внутреннюю силу, которая не требует громких слов.
            </motion.p>
            <br />
            <motion.p
              className="text-[18px] tablet:text-[20px] laptop:text-[20px] text-text font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Мы уделяем особое внимание выбору материалов, используя высококачественные натуральные Ткани, такие как
              Модал, Хлопок, Вискоза и др.
            </motion.p>
            <br />
            <motion.p
              className="text-[18px] tablet:text-[25px] laptop:text-[20px] text-text font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Siveno - это выбор. Это стиль, который не подчиняется времени, и ценности, которые идут изнутри.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col-reverse mindesk:flex-row justify-center gap-[40px] items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="max-w-[850px] mindesk:max-w-[450px] text-left w-full" variants={fadeIn("left", 0.3)}>
            <motion.p
              className="text-[18px] tablet:text-[25px] laptop:text-[20px] text-text font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Это обеспечивает комфорт, приятные тактильные ощущения и долговечность одежды, позволяя наслаждаться
              каждой деталью гардероба.
            </motion.p>
            <br />
            <motion.p
              className="text-[18px] tablet:text-[25px] laptop:text-[20px] text-text font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Помимо этого, коллекции Siveno сочетают в себе лаконичность и изысканность, создавая образы, которые
              остаются актуальными вне времени и модных тенденций.
            </motion.p>
            <br />
            <motion.p
              className="text-[18px] tablet:text-[25px] laptop:text-[20px] text-text font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Наши модели одежды подходят как для деловых встреч, так и для повседневной жизни, обеспечивая комфорт и
              стиль в любой ситуации.
            </motion.p>
            <br />
            <motion.p
              className="text-[18px] tablet:text-[25px] laptop:text-[20px] text-text font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Желаем вам приятного взаимодействия с брендом! Команда Siveno
            </motion.p>
          </motion.div>
          <div className="relative">
            <motion.div className="max-w-[550px] mb-[50px] w-full" variants={fadeIn("right", 0.5)} style={{ y: y2 }}>
              <Image width={550} height={730} loading="lazy" src={img4} alt="" className="shadow-lg" />
            </motion.div>
          </div>
        </motion.div>
      </div>
      <motion.h1
        className="font-semibold mt-[50px] text-center text-[36px] text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        История создания
      </motion.h1>
      {/* =========================== */}
      <div className="flex flex-col gap-[20px] mt-[100px]">
        <motion.div
          className="flex flex-col mindesk:flex-row justify-center gap-[40px] items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative">
            <motion.div className="max-w-[550px] w-full" variants={fadeIn("left", 0.3)} style={{ y: y1 }}>
              <Image width={550} height={630} loading="lazy" src={img1} alt="" className="shadow-lg" />
            </motion.div>
          </div>
          <motion.div className="max-w-[850px] mindesk:max-w-[450px] w-full" variants={fadeIn("right", 0.5)}>
            <motion.h2
              className="text-[24px] tablet:text-[28px] laptop:text-[32px] mb-[50px] text-text font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Екатерина Абдрахманова - собственница и идейный вдохновитель бренда.
            </motion.h2>
            <motion.p
              className="text-[18px] tablet:text-[20px] laptop:text-[20px] text-text font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Август 2024 года. Жаркий вечер, лёгкий ветерок, мысли, которые кружатся в голове, словно листья в воздухе.
              В тот момент я осознала: хочу путешествовать с деловыми целями. Но вместе с этим возник другой важный
              вопрос — мой гардероб. <br />
              <br />Я обновила его, но чего-то не хватало. Хотелось лёгкости, свободы, осознанности. Так родилась идея:
              создать свой бренд одежды. Бренд, который решает сразу две мои задачи — стиль и движение. Ведь мода не
              терпит статичности: выбор тканей, разработка моделей, поиск лучших решений — это бесконечный процесс,
              полный вдохновения.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col-reverse mindesk:flex-row justify-center gap-[40px] items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="max-w-[850px] mindesk:max-w-[450px] text-left w-full" variants={fadeIn("left", 0.3)}>
            <motion.p
              className="text-[18px] tablet:text-[18px] laptop:text-[20px] mb-[50px] text-text font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Я всегда мечтала о гардеробе, в котором минимум вещей, но максимум возможностей. Чтобы каждая деталь была
              продумана, каждая ткань дарила комфорт, а каждый образ отражал внутреннюю гармонию. Теперь мы воплощаем
              эту мечту в реальность.
            </motion.p>
            <motion.p
              className="text-[18px] tablet:text-[25px] laptop:text-[20px] text-text font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Сегодня вместе с дизайнером Викторией Щетниковой и нашей талантливой командой мы создаём не просто одежду,
              а стиль жизни. Siveno — это про тебя. Про твою самодостаточность, уверенность и утончённость. Про красоту
              в деталях и свободу в осознанном выборе.
            </motion.p>
          </motion.div>
          <div className="relative">
            <motion.div className="max-w-[550px] mb-[50px] w-full" variants={fadeIn("right", 0.5)} style={{ y: y2 }}>
              <Image width={550} height={730} loading="lazy" src={img2} alt="" className="shadow-lg" />
            </motion.div>
          </div>
        </motion.div>
      </div>
      {/* ======================== */}
    </div>
  );
};

export default AboutPage;
