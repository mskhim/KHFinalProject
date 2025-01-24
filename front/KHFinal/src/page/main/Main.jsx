import React, { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Main.css";

const Main = () => {
  useEffect(() => {
    const toggleButtons = document.querySelectorAll(".toggle-btn");
    toggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const extraImages = button.nextElementSibling;
        if (extraImages && extraImages.style.display === "block") {
          extraImages.style.display = "none";
          button.textContent = "확장";
        } else if (extraImages) {
          extraImages.style.display = "block";
          button.textContent = "축소";
        }
      });
    });

    const upButton = document.getElementById("up-button");
    if (upButton) {
      upButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }, []);

  return (
    <>
      <Header />

      <div className="banner">
        <p>배너/캐러셀 영역</p>
      </div>

      <div className="main-content">
        <div className="content-section">
          <p>타이틀 사진</p>
          <button className="toggle-btn">확장</button>
          <div className="images-container">
            <div className="image-row">
              <img src="https://via.placeholder.com/150" alt="이미지 1" />
              <img src="https://via.placeholder.com/150" alt="이미지 2" />
              <img src="https://via.placeholder.com/150" alt="이미지 3" />
            </div>
            <div className="image-row hidden">
              <img src="https://via.placeholder.com/150" alt="이미지 4" />
              <img src="https://via.placeholder.com/150" alt="이미지 5" />
              <img src="https://via.placeholder.com/150" alt="이미지 6" />
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <div id="up-button" className="up-button">
        UP
      </div>
    </>
  );
};

export default Main;
