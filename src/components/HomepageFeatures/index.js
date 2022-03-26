import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Treasury',
    Svg: require('@site/static/img/BANNY.svg').default,
    description: (
      <>
	Build a community around a project, fund it, and program its spending.
      </>
    ),
  },
  {
    title: 'Flexible',
    Svg: require('@site/static/img/BANNY.svg').default,
    description: (
      <>
	Build a community around a project, fund it, and program its spending.
      </>
    ),
  },
  {
    title: 'Powered by Ethereum',
    Svg: require('@site/static/img/BANNY.svg').default,
    description: (
      <>
	Powered by public smart contracts on Ethereum.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
