import React from 'react';
import PropTypes from 'prop-types';
import { Button, Heading, Modal } from '@fast-ai/ui-components';
import { FormattedMessage } from 'gatsby-theme-fast-ai';

import m from '../intl/messages';

const PredictionsModal = ({ predictions, closeModal, ...rest }) => (
	<Modal sx={{ textAlign: 'center', p: 4 }} {...rest}>
		<Heading as="h2" mt={1}>
			<FormattedMessage {...m.predictionsModalHeading} />
		</Heading>
		<pre>{JSON.stringify(predictions, null, 2)}</pre>
		<Button onClick={closeModal}>
			<FormattedMessage {...m.tryAgainLabel} />
		</Button>
	</Modal>
);
PredictionsModal.propTypes = {
	closeModal: PropTypes.func,
	predictions: PropTypes.object,
};

export default PredictionsModal;
