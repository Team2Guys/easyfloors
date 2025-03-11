import Card from 'components/Card/Card';
import Container from 'components/common/container/Container';
import Select from 'components/ui/Select';
import { accessoriesText } from 'data/data';
import React from 'react';
import { Feature, Product } from 'types/type';


interface ProductCardProps {
  product: Product[]; 
  features: Feature[]; 
}

const AccessoriesComp: React.FC<ProductCardProps> = ({ product, features }) => {
  return (
    <Container>
      <div className="lg:mt-14 mt-5 py-4 font-inter">
        <p
          className="text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: accessoriesText }}
        />
      </div>
      <div className="flex items-center justify-end gap-2 lg:py-8">
        <span className="text-[#191C1F] text-14 hidden lg:block">Sort by:</span>
        <Select options={['Most Popular', 'Low to High', 'High to Low']} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:mb-16">
        {product.map((product, index) => (
          <Card key={index} product={product} features={features} />
        ))}
      </div>
    </Container>
  );
};

export default AccessoriesComp;
