import { UserContext } from "../contexts/UserProvider";
import { useParameter } from '@storybook/addons';

const Decorator = (Story, context) => {
    const user = useParameter('user', { email: null, avatar: null });

    return (
        <UserContext.Provider value={user}>
            <Story />
        </UserContext.Provider>
    )
}

export default Decorator;
