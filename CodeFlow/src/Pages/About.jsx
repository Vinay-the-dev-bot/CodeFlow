import React from 'react';

function About() {
  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const sectionStyle = {
    marginBottom: '20px',
  };

  const articleStyle = {
    marginBottom: '15px',
  };

  const h1Style = {
    color: '#333',
    textAlign: 'center',
  };

  const h2Style = {
    color: '#555',
    marginBottom: '10px',
  };

  const h3Style = {
    color: '#777',
    marginBottom: '8px',
  };

  const pStyle = {
    lineHeight: '1.5',
  };

  return (
    <div style={containerStyle}>
      <h1 style={h1Style}>About us</h1>

      <section style={sectionStyle}>
        <h2 style={h2Style}>About CodeFlow:</h2>
        <article style={articleStyle}>
          <h3 style={h3Style}>Company Profile and Brand:</h3>
          <p style={pStyle}>
            CodeFlow is a leading platform that provides computer science resources and coding challenges for programmers and technology enthusiasts, With a strong emphasis on enhancing coding skills and knowledge. The platform offers a vast collection of tutorials, practice problems, covering various domains of computer science.
          </p>
          <p style={pStyle}>
            Our brand is built on the pillars of expertise, accessibility, and community. We strive to empower individuals to enhance their programming skills, to bridge the gap between academia and industry, and provide a supportive community to the learners. GeeksforGeeks is committed to promoting technological advancement and providing opportunities for growth in the ever-evolving field of computer science.
          </p>
        </article>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Corporate History, Mission, Vision, and Motto:</h2>

        <article style={articleStyle}>
          <h3 style={h3Style}>Corporate History:</h3>
          <p style={pStyle}>
            CodeFlow was founded in 2024 by Vinay Gouda and team with a vision to establish a comprehensive platform for computer science education and skill development. Over the years, the platform has experienced exponential growth, cementing its position as one of the most trusted and renowned names in the programming community.
          </p>
        </article>

        <article style={articleStyle}>
          <h3 style={h3Style}>Mission:</h3>
          <p style={pStyle}>
            Our mission is to empower programmers and technology enthusiasts worldwide to excel in their coding skills and unleash their full potential. We want to bridge the gap between theory and practice, equipping individuals with skills and expertise required to tackle real-world challenges in the ever-evolving field of technology and get them prepared for their dream jobs.
          </p>
        </article>

        <article style={articleStyle}>
          <h3 style={h3Style}>Vision:</h3>
          <p style={pStyle}>
            We envision a world where every programmer has unfettered access to top-tier learning resources, enabling them to continuously enhance their skills and flourish amidst the ever-evolving technology landscape. CodeFlow aspires to be the definitive platform for programmers, empowering them to stay at the forefront of their careers and make a significant impact in the dynamic tech industry. With the time, we have evolved and introduced other core fields preparation courses to support the young aspirants.
          </p>
        </article>

        <article style={articleStyle}>
          <h3 style={h3Style}>Motto:</h3>
          <p style={pStyle}>
            “Learn, Practice, and Excel” – This motto encapsulates our unwavering dedication to continuous learning, hands-on practice, and the pursuit of excellence. We firmly believe that learning is an ongoing journey that spans a lifetime, and with persistent practice and unwavering dedication, individuals can truly excel in the vast realm of computer science.
          </p>
        </article>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Company Founders/Directors:</h2>

        <article style={articleStyle}>
          <p style={pStyle}>
            Our founder Sandeep Jain is a visionary entrepreneur and esteemed computer science expert. Fueled by his unwavering passion for coding and education, laid the very bedrock upon which CodeFlow stands today, and his indomitable spirit has been instrumental in its remarkable growth and resounding success. As the steadfast driving force behind the company, Sandeep remains a beacon of guidance and inspiration, propelling the team to constantly challenging limits and craft transformative learning experiences.
          </p>
        </article>

        <article style={articleStyle}>
          <p style={pStyle}>
            Our CTO, Shikhar Goel has an impeccable track record of developing revolutionary products, with their innovative solutions serving as a vital catalyst for the remarkable success of GeeksforGeeks. Shikhar, the mastermind behind the creation of this platform, has demonstrated a progressive approach and an unwavering commitment to excellence, propelling the company to become the premier destination for coding enthusiasts worldwide.
          </p>
        </article>
      </section>
    </div>
  );
}

export default About;
