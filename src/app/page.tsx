import Container from "components/common/container/Container";
import Features from "components/Main/features/features";
import HeroMain from "components/Main/herosection/hero";

export default function Home() {
  return (
    <Container className="mt-20">
     <h1 className="text-primary">Welcome to Easyfloors</h1>
    <HeroMain/>
    <Features/>
    </Container>
   
  );
}
