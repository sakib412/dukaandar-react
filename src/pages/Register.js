import React, { useCallback, useState } from 'react';
import Onboarding01 from './Onboarding01';
import Onboarding02 from './Onboarding02';
import Onboarding03 from './Onboarding03';
import Onboarding04 from './Onboarding04';

function Register() {
    const [step, setStep] = useState(1);
    const changeStep = useCallback(step => {
        setStep(step)
    }, [setStep]);


    const rend = () => {
        if (step === 1) {
            return <Onboarding01 setStep={changeStep} />
        }
        else if (step === 2) {
            return <Onboarding02 setStep={changeStep} />
        } else if (step === 3) {
            return <Onboarding03 setStep={changeStep} />
        } else if (step === 4) {
            return <Onboarding04 setStep={changeStep} />
        }
    }

    return (
        <>
            {rend()}
        </>);
}

export default Register;
