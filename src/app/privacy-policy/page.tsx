import Container from 'components/common/container/Container';
import { privacyPolicyData } from 'data/privacy-policy';
import Link from 'next/link';
import React from 'react';
import { PrivacyPolicyProps } from 'types/type';

const PrivacyPolicy = ({ data = privacyPolicyData }: PrivacyPolicyProps) => {
  const renderLinkableText = (text: string) => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    const phoneRegex = /(\+\d{10,15})/g;
    const urlRegex = /(www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/gi;
    const segments = text.split(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+|\+\d{10,15}|www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/gi);
    return segments.map((segment, index) => {
      if (segment.match(emailRegex)) {
        return (
          <Link 
            key={index} 
            href={`mailto:${segment}`} 
            target="_blank" 
            className="text-primary"
          >
            {segment}
          </Link>
        );
      } else if (segment.match(phoneRegex)) {
        return (
          <Link 
            key={index} 
            href={`tel:${segment.replace(/\+/g, '')}`} 
            className="text-primary"
          >
            {segment}
          </Link>
        );
      } else if (segment.match(urlRegex)) {
        const url = segment.startsWith('www.') ? `https://${segment}` : `https://www.${segment}`;
        return (
          <Link 
            key={index} 
            href={url} 
            target="_blank" 
            className="text-primary"
          >
            {segment}
          </Link>
        );
      }
      return segment;
    });
  };

  return (
    <Container className='my-10 space-y-3 text-16 sm:text-18 font-inter'>
      <h1 className='text-2xl sm:text-4xl font-bold text-center'>Privacy Policy</h1>
      <p className='text-16 sm:text-18'>
        Our first goal at Easy Floors is to maintain the privacy of our customers and website visitors. 
        As specified in this privacy policy, we collect, use, retain, and safeguard your personal 
        information when you visit or make a purchase from our website.
      </p>
      
      <ol className="pl-4 sm:pl-6 space-y-6">
        {data.map((item, index) => (
          <li key={index} className="list-decimal">
            <h2 className="text-lg sm:text-2xl font-bold mb-2">{item.title}</h2>
            
            {item.content?.map((paragraph, pIndex) => (
              <p key={`p-${pIndex}`} className="text-12 sm:text-lg font-normal mt-2">
                {renderLinkableText(paragraph)}
              </p>
            ))}
            
            {item.heading?.map((title, hIndex) => (
              <h3 key={`h-${hIndex}`} className="text-base sm:text-xl font-semibold mt-3">
                {renderLinkableText(title)}
              </h3>
            ))}
            {item.Links?.map((link, lIndex) => (
              <p key={`l-${lIndex}`} className="text-12 sm:text-lg font-normal mt-2">
                {renderLinkableText(link)}
              </p>
            ))}
            {item.subItems && (
              <ul className="pl-4 sm:pl-6 list-disc space-y-1 mt-2">
                {item.subItems.map((subItem, sIndex) => (
                  <li key={`s-${sIndex}`} className="text-12 sm:text-lg font-normal">
                    {renderLinkableText(subItem)}
                  </li>
                ))}
              </ul>
            )}
            
            {item.contentend?.map((paragraph, eIndex) => (
              <p key={`e-${eIndex}`} className="text-12 sm:text-lg font-normal mt-2">
                {renderLinkableText(paragraph)}
              </p>
            ))}
          </li>
        ))}
      </ol>
    </Container>
  );
};

export default PrivacyPolicy;