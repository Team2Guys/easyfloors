import AboutUsInfo from "components/AboutUsInfo/AboutUsInfo";
import Container from "components/common/container/Container";
import Breadcrumb from "components/Reusable/breadcrumb";
import SampleGrid from "components/SampleGrid/SampleGrid";
import VideoComponent from "components/VideoComponent/AboutCompany";
import { alternatingData, sampleGridData } from "data/data";

const AboutUs = () => {
  return (
    <>
      <Breadcrumb title="About Us" image="/assets/images/aboutus/banner.png" />

      <Container>
        <div className="container mx-auto py-12">
          <AboutUsInfo sections={alternatingData} />
        </div>
        <div>
          <VideoComponent videoUrl="assets/images/aboutus/automated_blinds.mp4" />
          <SampleGrid sections={sampleGridData} />
        </div>
      </Container>
    </>
  );
};

export default AboutUs;
