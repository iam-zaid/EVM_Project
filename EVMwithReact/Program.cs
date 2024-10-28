using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using EVMwithReact.Data;
using EVMwithReact.Data.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<EVMwithReactContext>(options =>
    options.UseMySQL(builder.Configuration.GetConnectionString("EVMwithReactContext") ?? throw new InvalidOperationException("Connection string 'EVMwithReactContext' not found.")));

// Add services to the container.

builder.Services.AddControllersWithViews();

//to fix the cors error
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});
//code end for fix


var app = builder.Build();

//the code to initialise the seedData class for some data
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    SeedData.Initialize(services);
}
//code end for seedData

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("ReactPolicy");// to fix the cors error

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();

