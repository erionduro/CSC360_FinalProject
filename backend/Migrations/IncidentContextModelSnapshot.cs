﻿// <auto-generated />
using System;
using DBIncidents;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(IncidentContext))]
    partial class IncidentContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.6");

            modelBuilder.Entity("DBIncidents.Documentation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Notes")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Documentation");
                });

            modelBuilder.Entity("DBIncidents.Header", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Closed")
                        .HasColumnType("INTEGER");

                    b.Property<long>("CreatedTimestamp")
                        .HasColumnType("INTEGER");

                    b.Property<string>("HeaderId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Impact")
                        .HasColumnType("TEXT");

                    b.Property<bool>("InProgress")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Priority")
                        .HasColumnType("TEXT");

                    b.Property<string>("Status")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.Property<string>("Urgency")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Validation")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Header");
                });

            modelBuilder.Entity("DBIncidents.Incident", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("DocumentationId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("HeaderId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("RaciId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("TimelineId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("DocumentationId");

                    b.HasIndex("HeaderId");

                    b.HasIndex("RaciId");

                    b.HasIndex("TimelineId");

                    b.ToTable("Incident");
                });

            modelBuilder.Entity("DBIncidents.RACI", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AccountableParties")
                        .HasColumnType("TEXT");

                    b.Property<string>("ConsultedParties")
                        .HasColumnType("TEXT");

                    b.Property<string>("InformedParties")
                        .HasColumnType("TEXT");

                    b.Property<string>("ResponsibleParties")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Raci");
                });

            modelBuilder.Entity("DBIncidents.Timeline", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<long?>("ClosedTimestamp")
                        .HasColumnType("INTEGER");

                    b.Property<long?>("CreationTimestamp")
                        .HasColumnType("INTEGER");

                    b.Property<long?>("InProgressTimestamp")
                        .HasColumnType("INTEGER");

                    b.Property<long?>("ValidationTimestamp")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Timeline");
                });

            modelBuilder.Entity("DBIncidents.Incident", b =>
                {
                    b.HasOne("DBIncidents.Documentation", "Documentation")
                        .WithMany()
                        .HasForeignKey("DocumentationId");

                    b.HasOne("DBIncidents.Header", "Header")
                        .WithMany()
                        .HasForeignKey("HeaderId");

                    b.HasOne("DBIncidents.RACI", "Raci")
                        .WithMany()
                        .HasForeignKey("RaciId");

                    b.HasOne("DBIncidents.Timeline", "Timeline")
                        .WithMany()
                        .HasForeignKey("TimelineId");

                    b.Navigation("Documentation");

                    b.Navigation("Header");

                    b.Navigation("Raci");

                    b.Navigation("Timeline");
                });
#pragma warning restore 612, 618
        }
    }
}
