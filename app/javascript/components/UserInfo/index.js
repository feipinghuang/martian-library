import React, { useRef } from 'react';
import cs from './styles';
import { Me, SignMeIn } from "./operations.graphql";
import { useQuery, useMutation } from 'react-apollo';

const UserInfo = () => {
  const { loading, data } = useQuery(Me);
  
  const input = useRef(null)
  const [signIn, { loading: authenticating, error}] = useMutation(
    SignMeIn,
    {
      onCompleted({ signIn: { token } }) {
        if (token) localStorage.setItem('mlToken', token);
      },
      update(cache, { data: { signIn: { user } } }) {
        cache.writeQuery({
          query: Me,
          data: { me: user },
        });
      }
    }
  );

    return (
      <div className={cs.panel}>
        { loading 
          ? ('loading...')
          : (
            (!data.me) 
            ? (authenticating
              ? '...'
              : <div className={cs.signIn}>
                <form 
                  onSubmit={event => {
                    event.preventDefault()
                    signIn({ variables: { input: { email: input.current.value }  } })
                  }}>
                  <input
                    ref={input}
                    type="email"
                    className={cs.input}
                    placeholder="your email"
                  />
                  <input
                    type="submit"
                    className={cs.button}
                    value="Sign In"
                  />
                  {error && <span>{error.message}</span>}
                </form>
              </div>)
            : (<div className={cs.info}>😈 {data.me.fullName}</div>)
          )
        }        
      </div>
    )
};

export default UserInfo;