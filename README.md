# Lemon Cake Loader

Lemon Cake Loader is a Chrome extension that allows users to manage cookies for Netflix. This extension can set, get, and remove `SecureNetflixId` and `NetflixId` cookies to facilitate smoother Netflix usage.

## Features

-   **Set Cookies**: Manually set `SecureNetflixId` and `NetflixId` cookies for Netflix.
-   **Get Cookies**: Retrieve the current values of `SecureNetflixId` and `NetflixId` cookies.
-   **Remove Cookies**: Remove the `SecureNetflixId` and `NetflixId` cookies from Netflix.

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/your-username/lemon-cake-loader.git
    ```

2. Open Chrome and navigate to `chrome://extensions/`.

3. Enable "Developer mode" by clicking the toggle switch in the top right corner.

4. Click on the "Load unpacked" button and select the directory where you cloned the repository.

## Usage

1. Click on the Lemon Cake Loader icon in the Chrome toolbar.

2. Enter the values for `SecureNetflixId` and `NetflixId` in the respective input fields.

3. Use the following buttons to manage the cookies:
    - **Load**: Sets the cookies with the provided values and reloads the Netflix tab.
    - **Get**: Retrieves the current values of the cookies and displays them in the input fields.
    - **Remove**: Removes the cookies from Netflix and clears the input fields.

## Files

-   **background.js**: Handles background tasks such as setting, getting, and removing cookies, and reloading the tab.
-   **manifest.json**: Contains the configuration for the Chrome extension.
-   **index.html**: The popup HTML file.
-   **App.js**: React component for the popup interface.

## Development

1. Install dependencies:

    ```bash
    npm install
    ```

2. Start the development server:

    ```bash
    npm start
    ```

3.  3. Build the project:

    ```bash
    npm run build
    ```

## Contact

For any inquiries or feedback, please contact [akash.sh989@gmail.com]
