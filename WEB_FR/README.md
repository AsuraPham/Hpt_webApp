
# WAG-ADMIN

+ nodejs: version >= 8.12.0

+ if nodejs > =10.x.x

	+ On Unix
		python (v2.7 recommended, v3.x.x is not supported)
		make
		A proper C/C++ compiler toolchain, like GCC
	+ On macOS
		python (v2.7 recommended, v3.x.x is not supported) (already installed on macOS)
		Xcode
			You also need to install the Command Line Tools via Xcode. You can find this under the menu Xcode -> Preferences -> Locations (or by running xcode-select --install in your Terminal)
				This step will install gcc and the related toolchain containing make

	+ On Windows
		+ Option 1
			Install all the required tools and configurations using Microsoft's windows-build-tools using ``` npm install --global --production windows-build-tools ```  
			from an elevated PowerShell or CMD.exe (run as Administrator).
		
		+ Option 2
			Install tools and configuration manually:
			Install Visual C++ Build Environment: Visual Studio Build Tools (using "Visual C++ build tools" workload) or Visual Studio 2017 Community (using the "Desktop development with C++" workload)
			Install Python 2.7 (v3.x.x is not supported), and run npm config set python python2.7 (or see below for further instructions on specifying the proper Python version and path.)
			Launch cmd, npm config set msvs_version 2017
			If the above steps didn't work for you, please visit Microsoft's Node.js Guidelines for Windows for additional tips.
			To target native ARM64 Node.js on Windows 10 on ARM, add the components "Visual C++ compilers and libraries for ARM64" and "Visual C++ ATL for ARM64".
			
+ https://github.com/nodejs/node-gyp

+ npm: version >= 6.4.1

+ run project in visual studio code

 - step 1: open Terminal : npm install

 - step 2: npm start
