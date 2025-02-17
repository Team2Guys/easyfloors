import Container from "components/common/container/Container";
import Features from "components/Reusable/features";
import HeroMain from "components/Reusable/hero";
import { featureItems, heroItems } from "data/data";

export default function Home() {
  return (
    <Container className="mt-20">
    <h1 className="text-primary">Welcome to Easyfloors</h1>
    <HeroMain items={heroItems} />
    <Features items={featureItems} />
    </Container>
   
  );
}
