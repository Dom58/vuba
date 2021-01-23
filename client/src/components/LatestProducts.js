import React from 'react';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import COT from '../assets/cot.png';
import HAAPA from '../assets/haapa.png';
import SMDV from '../assets/smdvpt.png';

export default function LatestProducts() {
  const companies = [
    {
    name: '',
    image: HAAPA,
    url: '/'
    },
    {
      name: '',
      image: COT,
      url: '/'
    },
    {
      name: '',
      image: SMDV,
      url: '/'
    },
    {
      name: '',
      image: Logo,
      url: '/'
    },
  ];
  return (
    <>
    <br />
    <br />
    { companies && companies.map((company, i) => (
      <div className="column column-company" id="column" key={i} style={{marginTop: 20}}>
        <Link to={company.url}>
        <Image
          src={company.image}
          size="small"
          // style={{height: 'auto', width: '80%'}}
          className="contributor-logo"
        />{' '}
        </Link>
      </div>
      ))
    }
    </>
  );
}
