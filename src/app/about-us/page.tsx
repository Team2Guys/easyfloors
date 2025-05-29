import AboutUsInfo from "components/AboutUsInfo/AboutUsInfo";
import Container from "components/common/container/Container";
import Breadcrumb from "components/Reusable/breadcrumb";
import SampleGrid from "components/SampleGrid/SampleGrid";
import VideoComponent from "components/VideoComponent/AboutCompany";
import { alternatingData, sampleGridData } from "data/data";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'About Easy Floors UAE | Trusted Online Flooring Store in Dubai',
  description:
    'Learn more about Easy Floors—UAE’s leading online store for SPC and LVT flooring. Discover our Richmond & Polar collections, fast delivery, and free samples.',
  openGraph: {
    title: 'About Easy Floors UAE | Trusted Online Flooring Store in Dubai',
    description: 'Learn more about Easy Floors—UAE’s leading online store for SPC and LVT flooring. Discover our Richmond & Polar collections, fast delivery, and free samples.',
    url: '/about-us',
    images: [{url: "/assets/images/logo.webp", alt: 'Easyfloors',
      },
    ],
  },
  alternates: {
    canonical: '/about-us',
  },
};
const AboutUs = () => {
  return (
    <>
      <Breadcrumb title="About Us" showTitle image="/assets/images/aboutus/banner.png" />
      <Container>
        <div className="py-12">
          <AboutUsInfo sections={alternatingData} />
        </div>
        <div>
          <VideoComponent videoUrl="https://bncmain.s3.eu-north-1.amazonaws.com/1747803062851-s3" />
          <SampleGrid sections={sampleGridData} />
        </div>
      </Container>
    </>
  );
};

export default AboutUs;


