import * as React from 'react';
import ProductCategories from '../ProductCategories';
import ProductSmokingHero from '../ProductSmokingHero';
import ProductValues from '../ProductValues';
// import ProductHowItWorks from '../ProductHowItWorks';
import ProductCTA from '../ProductCTA';
import withRoot from '../../withRoot';
import Header from './Header';
import Recomended from './Recomended';

function Index() {
  return (
    <React.Fragment>
      <Header />
      <Recomended />
      <ProductValues />
      <ProductCategories />
      {/* <ProductHowItWorks /> */}
      <ProductCTA />
      <ProductSmokingHero />
    </React.Fragment>
  );
}

export default withRoot(Index);
