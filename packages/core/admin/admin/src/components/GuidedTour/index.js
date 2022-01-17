import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { GuidedTourProvider } from '@strapi/helper-plugin';
import setStateToLocaleStorage from './utils/setStateToLocaleStorage';
import startSection from './utils/startSection';
import reducer, { initialState } from './reducer';
import init from './init';

const GuidedTour = ({ children }) => {
  const [{ currentStep, guidedTourState, isGuidedTourVisible }, dispatch] = useReducer(
    reducer,
    initialState,
    init
  );

  const setCurrentStep = step => {
    const isStepAlreadyDone = get(guidedTourState, step);

    if (isStepAlreadyDone) {
      return null;
    }

    return dispatch({
      type: 'SET_CURRENT_STEP',
      step,
    });
  };

  const setGuidedTourVisibility = value => {
    dispatch({
      type: 'SET_GUIDED_TOUR_VISIBILITY',
      value,
    });
  };

  const setStepState = (section, step, value) => {
    setStateToLocaleStorage(section, step);

    dispatch({
      type: 'SET_STEP_STATE',
      section,
      step,
      value,
    });
  };

  return (
    <GuidedTourProvider
      guidedTourState={guidedTourState}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      setGuidedTourVisibility={setGuidedTourVisibility}
      setStepState={setStepState}
      startSection={startSection}
      isGuidedTourVisible={isGuidedTourVisible}
    >
      {children}
    </GuidedTourProvider>
  );
};

GuidedTour.propTypes = {
  children: PropTypes.element.isRequired,
};

export default GuidedTour;