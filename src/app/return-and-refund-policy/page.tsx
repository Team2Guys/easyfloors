import Container from 'components/common/container/Container';
import { policySections } from 'data/data';
import React from 'react';
import { createMetadata } from 'utils/metadataHelper';
import { pageMetadataData } from 'data/meta-data';
export const metadata = createMetadata(pageMetadataData.return_and_refund_policy);
const ReturnRefundPolicy = () => {
  return (
    <Container className="pt-10 md:pt-20">
      <h1 className="text-center text-36 sm:text-[47px] font-semibold mb-4 font-inter">Return and Refund Policy</h1>
      {policySections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className=" text-20 sm:text-28 font-semibold mb-2 font-inter">{section.title}</h2>
          {section.content.map((paragraph, i) => (
            <p key={i} className=" text-14 sm:text-20 sm:leading-[26px] mb-2 font-inter" dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
      ))}
    </Container>
  );
};

export default ReturnRefundPolicy;