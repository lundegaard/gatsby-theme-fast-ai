import React from 'react';
import {
	AvatarLink,
	Box,
	Col,
	Container,
	Flex,
	Link,
	MonospacedText,
	Row,
} from '@fast-ai/ui-components';

const SocialIconsMenu = props => <Flex as="ul" p={0} m={0} {...props} />;

const SocialIconsMenuItem = props => (
	<Box
		as="li"
		sx={{
			listStyle: 'none',
		}}
		{...props}
	/>
);
const socialLinks = [
	{
		href: 'https://www.facebook.com/lundegaard',
		title: 'Follow us on Facebook - Open in new window',
		children: 'F',
	},
	{
		href: 'https://www.instagram.com/zit.lunde/',
		title: 'Follow us on Instagram - Open in new window',
		children: 'I',
	},
	{
		href: 'https://twitter.com/lundegaardjerry',
		title: 'Follow us on Twitter - Open in new window',
		children: 'T',
	},
	{
		href: 'https://www.linkedin.com/company/lundegaard/',
		title: 'Follow us on LinkedIn - Open in new window',
		children: 'L',
	},
];
const Footer = props => (
	<Box
		as="footer"
		backgroundColor="primary"
		variant="transparentStripes"
		{...props}
	>
		<Container>
			<Row
				alignItems="center"
				py={[3, 4]}
				flexWrap="wrap"
				flexDirection={{ xs: 'column-reverse', md: 'row' }}
			>
				<Col span={[12, 12, 6]}>
					<MonospacedText
						textAlign={{ _: 'center', md: 'left' }}
						fontSize={{ _: 1, md: 2 }}
						color="contrast"
						mb={0}
					>
						All rights reserved |{' '}
						<Link
							variant="navFootbar"
							fontFamily="mono"
							href="https://www.lundegaard.eu/en/"
							target="_blank"
							title="Open in new window"
							sx={{
								color: 'contrast',
								':hover,:focus': {
									color: 'secondary',
								},
							}}
						>
							Lundegaard a.s.
						</Link>
					</MonospacedText>
				</Col>
				<Col span={[12, 12, 6]}>
					<SocialIconsMenu
						mx={-2}
						mb={{ _: 3, md: 0 }}
						justifyContent={{ _: 'center', md: 'flex-end' }}
					>
						{socialLinks.map(linkProps => (
							<SocialIconsMenuItem key={linkProps.children} mx={2}>
								<AvatarLink target="_blank" rel="noopener" {...linkProps} />
							</SocialIconsMenuItem>
						))}
					</SocialIconsMenu>
				</Col>
			</Row>
		</Container>
	</Box>
);

export default Footer;
