//包装函数
module.exports=function(grunt){
	//任务配置，所有插件的配置信息

	grunt.initConfig({
		//获取package.json的信息

		pkg:grunt.file.readJSON('package.json'),

		//uglify的配置信息
        //uglify  压缩javascript代码
        // uglify:{
			// options:{
			// 	stripBanners:true,
			// 	banner:'/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			// 	//banner在生成的压缩文件第一行加一句话说明
			// },
			// build:{
			// 	src:'src/test.js',										//压缩
			// 	dest:'build/<%=pkg.name%>-<%=pkg.version%>.js.min.js'	//生成
			// }
        // },
		//jshint插件的配置信息
        //jshint插件   检查javascript语法错误
		jshint:{
			//写法一
			// build:['Gruntfile.js','src/*.js'],
			// 写法二
			//可以用任何字符串代替“build”（但要符合js语法规则）。甚至，你可以把“build”指向的内容分开来写
			test1:['Gruntfile.js'],
			test2:['src/*.js'],
			options:{
				jshintrc:'.jshintrc'
			}
		},
		//自动化，类似于热加载
        watch:{
		    build:{
		        files:['src/*.js','src/*.css'],
				tasks:['jshint','uglify'],
				options:{spawn:false}
            }
        }
	});


	//加载插件
	grunt.registerTask('default',['jshint','watch']);
};
