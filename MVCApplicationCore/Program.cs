using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using MVCApplicationCore;
using MVCApplicationCore.Data;
using MVCApplicationCore.Data.Contract;
using MVCApplicationCore.Data.Implementation;
using MVCApplicationCore.Services.Contract;
using MVCApplicationCore.Services.Implementation;
using System.Drawing.Imaging;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Database connection
builder.Services.AddDbContextPool<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("mydb"));
});

// Configure JWET authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:Token"])),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
        };
    });

// Cofigure Services (Business layer)
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IProductService, ProductService>();

// Configure Services (Data layer)
builder.Services.AddScoped<IAppDbContext>(provider => (IAppDbContext)provider.GetService(typeof(AppDbContext)));
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();

var app = builder.Build();

// Inject IWebHostEnvironment
var env = app.Services.GetRequiredService<IWebHostEnvironment>();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}

// Add the JwetTokenMiddleware
app.UseMiddleware<JwtTokenMiddleware>();
app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Uploads")),
    RequestPath ="/Uploads"
});

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
