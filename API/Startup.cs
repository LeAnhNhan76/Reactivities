using Application.Service;
using FrameworkCore.Constants;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Persistence;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AutoMapper;
using API.AutoMapper;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        public Startup(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(opt =>
            {
                opt.UseSqlServer(
                    _configuration.GetConnectionString(Constant.DefaultConnection)
                ).EnableSensitiveDataLogging();
            });
            services.AddControllers();

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc(name: "v1", new OpenApiInfo { Title = "Reactivities APIs", Version = "v1" });
            });

            services.AddCors(options =>
            {
                options.AddPolicy("AllowCors", policy =>
                    policy.WithOrigins("http://localhost:3000")
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials()
                );
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
              .AddJwtBearer(
                authenticationScheme: JwtBearerDefaults.AuthenticationScheme,
                configureOptions: options => {
                  options.TokenValidationParameters = new TokenValidationParameters {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this._configuration[Constant.TokenKey])),
                    ValidateIssuer = false,
                    ValidateAudience = false
                  };
              });

            services.AddHttpContextAccessor();

            this.RegisterMediatR(services);

            this.RegisterServices(services);

            this.RegisterAutoMapper(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint(url: "/swagger/v1/swagger.json", name: "Reactivites API V1");
            });

            app.UseRouting();

            app.UseCors("AllowCors");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void RegisterMediatR(IServiceCollection services) 
        {
          var applicationAssembly = typeof(Application.AssemblyReference).Assembly;

          services.AddMediatR(applicationAssembly);
        }

        public void RegisterServices(IServiceCollection services) 
        {
          services.AddScoped<ITokenService, TokenService>();
        }

        public void RegisterAutoMapper(IServiceCollection services)
        {
            var mapperConfig = new MapperConfiguration(mc => {
                mc.AddProfile(new MappingProfile());
            });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);
        }
    }
}