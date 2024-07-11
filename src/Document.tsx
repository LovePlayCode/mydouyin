import { Html, Root, Head, Body } from '@modern-js/runtime/document';

export default function Document(): React.ReactElement {
  return (
    <Html>
      <meta name="referrer" content="no-referrer" />
      <Head />
      <Body>
        <Root rootId="root" />
      </Body>
    </Html>
  );
}
