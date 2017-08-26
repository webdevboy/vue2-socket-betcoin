const grunt = require('grunt');
grunt.loadNpmTasks('grunt-aws-lambda');
grunt.loadNpmTasks('grunt-contrib-copy');
const lib = require("../../../lib")
grunt.initConfig({
	copy : {
		main : {
			files : [
				{expand: true, src: ['../../../lib/**'], dest: 'dist/lib/'},
				{expand: true, cwd: 'src/', src: ['**'], dest: 'dist/'},

			]
		}
	},
	lambda_invoke: {
		default: {
			options: {
				file_name: 'index.js'
			}
		}
	},
	lambda_deploy: {
		default: {
			function: 'chratos_receivePaymentCoinbase'
		}
	},
	lambda_package: {
		default: {}
	}
});


grunt.registerTask('deploy', ['lambda_package', 'lambda_deploy'])