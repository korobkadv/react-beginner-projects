import React from 'react';

export const Success = ({ count }) => {
  return (
    <div className="success-block">
      <img src="/assets/success.svg" alt="Success" />
      <h3>Successfully!</h3>
      <p>{count} users sent an invitation.</p>
      <button onClick={() => window.location.reload()} className="send-invite-btn">Back</button>
    </div>
  );
};
