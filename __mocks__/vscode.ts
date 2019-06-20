const getConfigurationMock = jest.fn();
const updateConfigurationMock = jest.fn();

export const workspace = {
    getConfiguration: () => ({
        get: getConfigurationMock,
        update: updateConfigurationMock
    })
};