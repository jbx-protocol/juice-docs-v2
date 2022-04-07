import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Documentation',
    Svg: require('@site/static/img/apple.svg').default,
    description: (
      <>
	Visit the docs to learn about the Juicebox protocol.
      </>
    ),
  },
  {
    title: 'Blog',
    Svg: require('@site/static/img/pina.svg').default,
    description: (
      <>
	Visit the blog for updates, observations, guides, and resources.
      </>
    ),
  },
  {
    title: 'Community',
    Svg: require('@site/static/img/blueberry.svg').default,
    description: (
      <>
	For more, join the Juicebox Discord server and follow @juiceboxETH on Twitter.
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
